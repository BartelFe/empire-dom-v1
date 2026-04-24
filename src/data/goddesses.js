/* -----------------------------------------------------------
   Goddess placeholder data — asymmetric wall grid.
   Images are seeded picsum URLs (stable on reload, replace
   with real ones later). The `span` values map to a 6-col /
   4-row grid for deliberate asymmetry.
   ----------------------------------------------------------- */

const base = 'https://picsum.photos/seed';

export const GODDESSES = [
  { id: 'g01', name: 'Ophelia',   img: `${base}/ed-goddess-01/720/1080`, col: 'col-span-2 row-span-2', aspect: '3/4' },
  { id: 'g02', name: 'Isolde',    img: `${base}/ed-goddess-02/720/540`,  col: 'col-span-2 row-span-1', aspect: '4/3' },
  { id: 'g03', name: 'Seraphine', img: `${base}/ed-goddess-03/720/1080`, col: 'col-span-2 row-span-2', aspect: '3/4' },
  { id: 'g04', name: 'Valeria',   img: `${base}/ed-goddess-04/720/540`,  col: 'col-span-2 row-span-1', aspect: '4/3' },
  { id: 'g05', name: 'Celeste',   img: `${base}/ed-goddess-05/720/720`,  col: 'col-span-2 row-span-2', aspect: '1/1' },
  { id: 'g06', name: 'Mireille',  img: `${base}/ed-goddess-06/720/1080`, col: 'col-span-2 row-span-2', aspect: '3/4' },
  { id: 'g07', name: 'Anastasia', img: `${base}/ed-goddess-07/720/540`,  col: 'col-span-2 row-span-1', aspect: '4/3' },
  { id: 'g08', name: 'Domitia',   img: `${base}/ed-goddess-08/720/720`,  col: 'col-span-2 row-span-1', aspect: '1/1' },
  { id: 'g09', name: 'Octavia',   img: `${base}/ed-goddess-09/720/1080`, col: 'col-span-2 row-span-2', aspect: '3/4' },
  { id: 'g10', name: 'Carmilla',  img: `${base}/ed-goddess-10/720/720`,  col: 'col-span-2 row-span-1', aspect: '1/1' },
];
