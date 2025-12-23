import { FamilyMember, Marriage } from './types.ts';

export const MARRIAGES: Marriage[] = [
  { id: 'U0', husbandId: 'martin', wifeId: 'helga', date: '08.02.1928', location: 'Testrup', status: 'Ophørte ved død' },
  { id: 'U1', husbandId: 'calle', wifeId: 'ingrid', date: '01.05.1953', location: 'Binderup Kirke' },
  { id: 'U2', husbandId: 'iver', wifeId: 'anna', date: '01.05.1953', location: 'Binderup Kirke' },
  { id: 'U2A', husbandId: 'kaj', wifeId: 'bitten', type: 'Papirløst' },
  { id: 'U3', husbandId: 'kris', wifeId: 'annic', date: '09.10.1955' },
  { id: 'U3A', husbandId: 'ivan', wifeId: 'annig', type: 'Papirløst' },
  { id: 'U3B', husbandId: 'chrb', wifeId: 'lene', date: '13.05.1978' },
  { id: 'U3C', husbandId: 'oleo', wifeId: 'piab', date: '11.04.2004' },
  { id: 'U3D', husbandId: 'henriko', wifeId: 'kirst', date: '29.04.1995' },
  { id: 'U4', husbandId: 'svend', wifeId: 'edi', date: '06.05.1955', location: 'Binderup Kirke' },
  { id: 'U4A', husbandId: 'johnp', wifeId: 'rita', date: '05.06.1976', location: 'Fjelsø Kirke' },
  { id: 'U4B', husbandId: 'jang', wifeId: 'elinj', date: '11.02.1984', location: 'Suldrup Kirke' },
  { id: 'U4C', husbandId: 'nielsk', wifeId: 'hellen', date: '13.07.2001', location: 'Aars Rådhus' },
  { id: 'U4D', husbandId: 'michaelk', wifeId: 'bentek', date: '22.07.1995', location: 'Durup Kirke' },
  { id: 'U5', husbandId: 'andr', wifeId: 'astrid', date: '22.07.1961' },
  { id: 'U5A', husbandId: 'kurt', wifeId: 'alex', date: '09.07.2005' },
  { id: 'U5B', husbandId: 'carstenb', wifeId: 'bodil', date: '23.06.1995' },
  { id: 'U7', husbandId: 'bent', wifeId: 'elly', date: '15.05.1976', location: 'Haverslev Kirke' },
  { id: 'U7A', husbandId: 'jorgen', wifeId: 'birgit', date: '10.05.2000', location: 'Vroue Kirke', divorced: true },
  { id: 'U7A1', husbandId: 'christ', wifeId: 'amalie', date: '21.03.2025' },
  { id: 'U7B', husbandId: 'morten', wifeId: 'lisbeth', date: '26.08.2000', divorced: true },
  { id: 'U7C', husbandId: 'jenso', wifeId: 'karina', date: '30.08.2003' }
];

export const MEMBERS: FamilyMember[] = [
  // Generation 1 (Root)
  { id: 'helga', name: 'Helga Nielsen Pedersen', birthDate: '05.06.1905', deathDate: '26.09.1969', gender: 'female', burialPlace: 'Binderup Kirkegård' },
  { id: 'martin', name: 'Martin Christensen', birthDate: '01.05.1897', deathDate: '04.07.1985', gender: 'male', burialPlace: 'Binderup Kirkegård' },

  // Generation 2
  { id: 'ingrid', parentId: 'U0', name: 'Ingrid Christensen', birthDate: '22.02.1928', deathDate: '10.03.1995', gender: 'female' },
  { id: 'calle', name: 'Calle Schrøder', birthDate: '06.04.1926', deathDate: '06.12.1988', gender: 'male' },
  
  { id: 'anna', parentId: 'U0', name: 'Anna Christensen', birthDate: '10.05.1929', deathDate: '20.11.2014', gender: 'female' },
  { id: 'iver', name: 'Iver Larsen', birthDate: '15.06.1918', gender: 'male' },
  
  { id: 'kris', parentId: 'U0', name: 'Kristen Christensen', birthDate: '12.10.1931', deathDate: '06.06.2009', gender: 'male' },
  { id: 'annic', name: 'Anni Christensen', birthDate: '28.04.1935', gender: 'female' },
  
  { id: 'edi', parentId: 'U0', name: 'Edith Christensen', birthDate: '10.02.1934', deathDate: '15.09.2011', gender: 'female' },
  { id: 'svend', name: 'Svend Erik Jensen', birthDate: '02.05.1932', deathDate: '20.11.2024', gender: 'male' },
  
  { id: 'andr', parentId: 'U0', name: 'Andreas Christensen', birthDate: '20.10.1935', deathDate: '04.11.2009', gender: 'male' },
  { id: 'astrid', name: 'Astrid', birthDate: '30.07.1938', deathDate: '24.07.1993', gender: 'female' },
  
  { id: 'tag', parentId: 'U0', name: 'Tage Christensen', birthDate: '11.02.1939', deathDate: '05.04.2000', gender: 'male' },
  { id: 'inger', name: 'Inger Kragelund', birthDate: '30.08.1934', gender: 'female' },
  
  { id: 'bent', parentId: 'U0', name: 'Bent Christensen', birthDate: '25.10.1944', gender: 'male' },
  { id: 'elly', name: 'Elly Andersen', birthDate: '15.12.1947', gender: 'female' },

  // Generation 3 - Anna branch
  { id: 'tove', parentId: 'U2', name: 'Tove Larsen', birthDate: '04.06.1955', gender: 'female' },
  { id: 'kaj', parentId: 'U2', name: 'Kaj Larsen', birthDate: '16.04.1958', gender: 'male' },
  { id: 'bitten', name: 'Bitten Glenstrup Otte', birthDate: '28.03.1961', gender: 'female' },
  
  // Generation 4 - Anna branch
  { id: 'annemette', parentId: 'tove', name: 'Anne Mette', birthDate: '01.01.1984', gender: 'female' },
  { id: 'line', parentId: 'U2A', name: 'Line Hoff Nyby', birthDate: '01.02.1990', gender: 'female' },
  { id: 'lykke', parentId: 'U2A', name: 'Lykke Glenstrup Larsen', birthDate: '20.07.1992', gender: 'female' },

  // Generation 3 - Kristen branch
  { id: 'ivan', parentId: 'U3', name: 'Ivan Christensen', birthDate: '17.05.1956', gender: 'male' },
  { id: 'annig', name: 'Anni Gamskjær', birthDate: '10.07.1957', gender: 'female' },
  { id: 'lene', parentId: 'U3', name: 'Lene Christensen', birthDate: '18.07.1958', gender: 'female' },
  { id: 'chrb', name: 'Christian Bundgaard', birthDate: '27.04.1955', gender: 'male' },
  { id: 'carsc', parentId: 'U3', name: 'Carsten Christensen', birthDate: '23.03.1965', gender: 'male' },
  { id: 'kirst', parentId: 'U3', name: 'Kirsten Christensen', birthDate: '27.11.1966', gender: 'female' },
  { id: 'henriko', name: 'Henrik Olsen', birthDate: '16.01.1956', gender: 'male' },
  
  // Generation 4 - Kristen branch (Lene/Christian)
  { id: 'helleb', parentId: 'U3B', name: 'Helle Bundgaard', birthDate: '26.01.1975', gender: 'female' },
  { id: 'piab', parentId: 'U3B', name: 'Pia Bundgaard', birthDate: '09.02.1978', gender: 'female' },
  { id: 'oleo', name: 'Ole Olesen', birthDate: '26.01.1974', gender: 'male' },
  { id: 'martb', parentId: 'U3B', name: 'Martin Bundgaard', birthDate: '21.09.1980', gender: 'male' },
  { id: 'dortb', parentId: 'U3B', name: 'Dorte Bundgaard', birthDate: '28.10.1984', gender: 'female' },
  
  // Generation 5 - Kristen branch (Pia/Ole)
  { id: 'katrineo', parentId: 'U3C', name: 'Katrine Olesen', birthDate: '27.01.2007', gender: 'female' },
  { id: 'teiso', parentId: 'U3C', name: 'Teis Olesen', birthDate: '27.01.2007', gender: 'male' },

  // Generation 3 - Edith branch
  { id: 'rita', parentId: 'U4', name: 'Rita Jensen', birthDate: '26.11.1955', gender: 'female' },
  { id: 'johnp', name: 'John Peter Poulsen', birthDate: '05.06.1946', gender: 'male' },
  { id: 'elinj', parentId: 'U4', name: 'Elin Jensen', birthDate: '16.03.1958', gender: 'female' },
  { id: 'jang', name: 'Jan Grønhøj', gender: 'male' },
  { id: 'nielsk', parentId: 'U4', name: 'Niels Kristian Jensen', birthDate: '19.04.1961', gender: 'male' },
  { id: 'hellen', name: 'Helle Nielsen', gender: 'female' },
  { id: 'michaelk', parentId: 'U4', name: 'Mikael Kjærsgaard', birthDate: '14.04.1965', gender: 'male' },
  { id: 'bentek', name: 'Bente Kjærsgaard', gender: 'female' },

  // Generation 4 - Edith branch (Rita/John)
  { id: 'karinap', parentId: 'U4A', name: 'Karina Beg Poulsen', birthDate: '12.12.1978', gender: 'female' },
  { id: 'heinrp', parentId: 'U4A', name: 'Heinrich Beg Poulsen', birthDate: '15.12.1981', gender: 'male' },
  { id: 'natasjap', parentId: 'U4A', name: 'Natasja Beg Poulsen', birthDate: '12.10.2001', gender: 'female' },

  // Generation 4 - Edith branch (Elin/Jan)
  { id: 'anittag', parentId: 'U4B', name: 'Anitta Grønhøj', birthDate: '16.12.1981', gender: 'female' },
  { id: 'jonasg', parentId: 'U4B', name: 'Jonas Grønhøj', birthDate: '21.01.1986', gender: 'male' },
  { id: 'heleneg', parentId: 'U4B', name: 'Helene Grønhøj', birthDate: '11.01.1989', gender: 'female' },
  { id: 'runeg', parentId: 'U4B', name: 'Rune Grønhøj', birthDate: '05.12.1996', gender: 'male' },

  // Generation 4 - Edith branch (Niels/Helle)
  { id: 'jimmi', parentId: 'U4C', name: 'Jimmi Julian Jensen', birthDate: '02.02.1996', gender: 'male' },
  { id: 'chrisj', parentId: 'U4C', name: 'Christina Jensen', birthDate: '30.10.1998', gender: 'female' },
  { id: 'anittan', parentId: 'U4C', name: 'Anitta Normo', birthDate: '13.07.1886', gender: 'female' },

  // Generation 4 - Edith branch (Mikael/Bente)
  { id: 'dennisk', parentId: 'U4D', name: 'Dennis Kjærsgaard', birthDate: '19.12.1991', gender: 'male' },
  { id: 'rasmusk', parentId: 'U4D', name: 'Rasmus Kjærsgaard', birthDate: '17.10.1993', gender: 'male' },
  { id: 'ceciliak', parentId: 'U4D', name: 'Cecilia Kjærsgaard', birthDate: '09.02.1999', gender: 'female' },

  // Generation 3 - Andreas branch
  { id: 'kurt', parentId: 'U5', name: 'Kurt Christensen', birthDate: '20.09.1963', gender: 'male' },
  { id: 'alex', name: 'Alexandra', gender: 'female' },
  { id: 'bodil', parentId: 'U5', name: 'Bodil Christensen', birthDate: '25.03.1969', gender: 'female' },
  { id: 'carstenb', name: 'Carsten Becker', gender: 'male' },

  // Generation 4 - Andreas branch
  { id: 'alina', parentId: 'U5A', name: 'Alina Christensen', birthDate: '1991', gender: 'female' },
  { id: 'andersb', parentId: 'U5B', name: 'Anders Becker', birthDate: '06.01.1996', gender: 'male' },
  { id: 'astridb', parentId: 'U5B', name: 'Astrid Becker', birthDate: '16.12.1999', gender: 'female' },
  { id: 'antonb', parentId: 'U5B', name: 'Anton Becker', gender: 'male' },

  // Generation 3 - Bent branch
  { id: 'birgit', parentId: 'U7', name: 'Birgit Christensen', birthDate: '14.03.1973', gender: 'female' },
  { id: 'jorgen', name: 'Jørgen Jokumsen', birthDate: '06.03.1967', gender: 'male' },
  { id: 'lisbeth', parentId: 'U7', name: 'Lisbeth Christensen', birthDate: '07.06.1974', gender: 'female' },
  { id: 'morten', name: 'Morten Gedsted Hansen', birthDate: '04.12.1970', gender: 'male' },
  { id: 'jenso', parentId: 'U7', name: 'Jens Ove Christensen', birthDate: '14.04.1977', gender: 'male' },
  { id: 'karina', name: 'Karina Sneftrup', birthDate: '07.02.1977', gender: 'female' },
  { id: 'helgal', parentId: 'U7', name: 'Helga Linda Christensen', birthDate: '04.11.1978', gender: 'female' },

  // Generation 4 - Bent branch (Birgit/Jørgen)
  { id: 'amalie', parentId: 'U7A', name: 'Amalie Teglgaard', birthDate: '08.05.1999', gender: 'female' },
  { id: 'christ', name: 'Christian Teglgaard', birthDate: '05.03.1998', gender: 'male' },
  { id: 'rasmusj', parentId: 'U7A', name: 'Rasmus Jokumsen', birthDate: '24.05.2001', gender: 'male' },
  { id: 'madsj', parentId: 'U7A', name: 'Mads Jokumsen', birthDate: '29.05.2003', gender: 'male' },
  { id: 'lauraj', parentId: 'U7A', name: 'Laura Jokumsen', birthDate: '22.04.2005', gender: 'female' },

  // Generation 5 - Bent branch (Amalie/Christian)
  { id: 'mariet', parentId: 'U7A1', name: 'Marie My Teglgaard', birthDate: '16.06.2022', gender: 'female' },
  { id: 'johannest', parentId: 'U7A1', name: 'Johannes Teglgaard', birthDate: '30.11.2025', gender: 'male' },

  // Generation 4 - Bent branch (Lisbeth/Morten & Lisbeth Solo)
  { id: 'camilla', parentId: 'U7B', name: 'Camilla Gedsted Hansen', birthDate: '24.05.1995', gender: 'female' },
  { id: 'cathrine', parentId: 'U7B', name: 'Cathrine Gedsted Hansen', birthDate: '30.03.1997', gender: 'female' },
  { id: 'cecilie', parentId: 'U7B', name: 'Cecilie Gedsted Hansen', birthDate: '19.03.1999', gender: 'female' },
  { id: 'casper', parentId: 'U7B', name: 'Casper Gedsted Hansen', birthDate: '04.02.2002', gender: 'male' },
  { id: 'phillipa', parentId: 'lisbeth', name: 'Phillipa Sofia Kvistgaard Østergaard', birthDate: '07.05.2014', gender: 'female' },
  { id: 'selma', parentId: 'lisbeth', name: 'Selma Olivia Kvistgaard Østergaard', birthDate: '23.12.2015', gender: 'female' },

  // Generation 4 - Bent branch (Jens Ove/Karina)
  { id: 'jonassc', parentId: 'U7C', name: 'Jonas Sneftrup Christensen', birthDate: '30.05.2001', gender: 'male' },
  { id: 'lukassc', parentId: 'U7C', name: 'Lukas Sneftrup Christensen', birthDate: '16.03.2004', gender: 'male' },
  { id: 'eliassc', parentId: 'U7C', name: 'Elias Sneftrup Christensen', birthDate: '19.05.2011', gender: 'male' },
  
  // Helga Linda Solo Children
  { id: 'frederik', parentId: 'helgal', name: 'Frederik Christensen', birthDate: '04.09.2016', gender: 'male' },
  { id: 'magnus', parentId: 'helgal', name: 'Magnus Christensen', birthDate: '18.05.2018', gender: 'male' }
];