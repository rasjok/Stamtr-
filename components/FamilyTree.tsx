
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { FamilyMember, Marriage, FamilyUnitNode } from '../types';

interface FamilyTreeProps {
  members: FamilyMember[];
  marriages: Marriage[];
  customPhotos: Record<string, string>;
  onSelectMember: (member: FamilyMember) => void;
  onSelectMarriage: (marriage: Marriage) => void;
  rootId?: string; // New prop to start tree from a specific person
}

const FamilyTree: React.FC<FamilyTreeProps> = ({ 
  members, 
  marriages, 
  customPhotos, 
  onSelectMember, 
  onSelectMarriage,
  rootId = 'helga'
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || members.length === 0) return;

    const width = 6000;
    const height = 2500;
    const margin = { top: 200, right: 300, bottom: 200, left: 300 };

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const gMain = svg.append("g");
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.05, 3])
      .on("zoom", (event) => gMain.attr("transform", event.transform));
    svg.call(zoom);

    const buildHierarchy = (descendantId: string): FamilyUnitNode => {
      const person = members.find(m => m.id === descendantId);
      if (!person) return null as any;

      const marriage = marriages.find(m => m.husbandId === descendantId || m.wifeId === descendantId);
      const partnerId = marriage ? (marriage.husbandId === descendantId ? marriage.wifeId : marriage.husbandId) : null;
      const partner = partnerId ? members.find(m => m.id === partnerId) : undefined;

      const unit: FamilyUnitNode = {
        id: person.id,
        descendant: person,
        partner,
        marriage,
        children: []
      };

      const marriageChildren = marriage ? members.filter(mem => mem.parentId === marriage.id) : [];
      const directChildren = members.filter(mem => mem.parentId === descendantId);
      const allChildMembers = [...new Set([...marriageChildren, ...directChildren])];
      
      allChildMembers.forEach(child => {
        const childNode = buildHierarchy(child.id);
        if (childNode) unit.children?.push(childNode);
      });

      return unit;
    };

    const rootData = buildHierarchy(rootId);
    if (!rootData) return;

    const root = d3.hierarchy(rootData);
    const treeLayout = d3.tree<FamilyUnitNode>().nodeSize([450, 500]); 
    treeLayout(root);

    const linkGen = d3.linkVertical<any, any>().x(d => d.x).y(d => d.y);
    
    gMain.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .selectAll("path")
      .data(root.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", linkGen as any);

    const nodes = gMain.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .selectAll(".node-group")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node-group")
      .attr("transform", d => `translate(${d.x},${d.y})`);

    const descNode = nodes.append("g")
      .style("cursor", "pointer")
      .on("click", (e, d) => onSelectMember(d.data.descendant));

    descNode.append("circle")
      .attr("r", 35)
      .style("fill", d => d.data.descendant.deathDate ? "#e5e1d8" : "#fff")
      .style("stroke", "#d4af37")
      .style("stroke-width", "3px");

    descNode.append("text")
      .attr("dy", "55")
      .attr("text-anchor", "middle")
      .attr("class", "serif text-[13px] font-black")
      .style("fill", "#2d2416")
      .text(d => d.data.descendant.name);

    const partnerNodes = nodes.filter(d => !!d.data.partner);
    
    partnerNodes.append("line")
      .attr("x1", 35)
      .attr("y1", 0)
      .attr("x2", 115)
      .attr("y2", 0)
      .style("stroke", "#d4af37")
      .style("stroke-width", "1.5px")
      .style("stroke-dasharray", "4,2");

    const spouseNode = partnerNodes.append("g")
      .attr("transform", "translate(150, 0)")
      .style("cursor", "pointer")
      .on("click", (e, d) => d.data.partner && onSelectMember(d.data.partner));

    spouseNode.append("circle")
      .attr("r", 30)
      .style("fill", d => d.data.partner?.deathDate ? "#f0eee9" : "#fff")
      .style("stroke", "#8b7355")
      .style("stroke-opacity", "0.6")
      .style("stroke-width", "2px");

    spouseNode.append("text")
      .attr("dy", "50")
      .attr("text-anchor", "middle")
      .attr("class", "serif text-[11px] font-bold opacity-70")
      .text(d => d.data.partner?.name || "");

    const marriageRingGroup = partnerNodes.append("g")
      .attr("transform", "translate(75, 0)")
      .style("cursor", "pointer")
      .on("click", (e, d) => d.data.marriage && onSelectMarriage(d.data.marriage));

    marriageRingGroup.append("circle")
      .attr("r", 14)
      .style("fill", "#fff")
      .style("stroke", "#d4af37")
      .style("stroke-width", "1px")
      .style("stroke-opacity", "0.4");

    marriageRingGroup.append("text")
      .attr("dy", "6")
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("💍");

    svg.call(zoom.transform, d3.zoomIdentity.translate(width/2 - 500, 150).scale(0.35));

  }, [members, marriages, customPhotos, rootId]);

  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <svg ref={svgRef} className="w-full h-full"></svg>
    </div>
  );
};

export default FamilyTree;
