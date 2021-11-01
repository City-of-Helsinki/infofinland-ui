//Demo data
export const PAGES = [
  { text: 'Home', url: '/' },
  {
    text: 'Moving to Finland',
    url: '/theme1',

    pages: [
      { text: 'Health frontpage', url: '/theme1/1' },
      { text: ' Emergencies', url: '/theme1/2' },
      {
        text: ' Health services in Finland',
        url: '/theme1/3',

        pages: [
          { text: 'Health frontpage', url: '/theme1/3/1' },
          { text: ' Emergencies', url: '/theme1/3/2' },
          { text: ' Health services in Finland', url: '/theme1/3/3' },
          { text: ' Support during illness', url: '/theme1/3/4' },
        ],
      },

      { text: 'Medication', url: '/theme1/4' },
      { text: ' Support during illness', url: '/theme1/5' },
      { text: 'Rehabilitation', url: '/theme1/6' },
      { text: ' Disabled persons', url: '/theme1/7' },
    ],
  },
  {
    text: ' Education',
    url: '/theme2',
    pages: [
      { text: 'Children’s health', url: '/theme2/1' },
      { text: 'Dental care', url: '/theme2/2' },
      { text: 'Mental health', url: '/theme2/3' },
      { text: 'Sexual health and contraception', url: '/theme2/4' },
      { text: 'Abortion', url: '/theme2/5 ' },
    ],
  },
  // {
  //   text: 'Settling in Finland',
  //   url: '/theme009',
  //   pages: SUBMENU,
  // },
  // {
  //   text: 'Work and enterprise',
  //   url: '/theme3',
  //   pages: [
  //     { text: 'Health frontpage', url: '/asdad' },
  //     { text: ' Emergencies', url: '/asdasd' },
  //     { text: ' Health services in Finland', url: '/asdasdsa' },
  //   ],
  // },

  // {
  //   text: 'Finnish and Swedish',
  //   url: '/theme4',
  //   pages: [
  //     {
  //       text: 'Health frontpage',
  //       url: '/asdadsa2',
  //       pages: [
  //         { text: 'Health frontpage', url: '/324234' },
  //         { text: ' Emergencies', url: '/2342g2' },
  //         { text: ' Health services in Finland', url: '/32432' },
  //         { text: ' Support during illness', url: '/343g43' },
  //         { text: 'Rehabilitation', url: '/365e7n' },
  //         { text: ' Disabled persons', url: '/5b4326856' },
  //       ],
  //     },
  //     { text: ' Emergencies', url: '/63w45b' },
  //     { text: ' Health services in Finland', url: '/34b36' },
  //     { text: ' Support during illness', url: '/g6' },
  //     { text: 'Rehabilitation', url: '/25434h45' },
  //     { text: ' Disabled persons', url: '/jugi23' },
  //   ],
  // },
  // {
  //   text: 'Housing',
  //   url: '/theme5',
  //   pages: [
  //     { text: 'Pregnancy and childbirth', url: '/sebw35' },
  //     { text: 'Medication', url: '/3b5435' },
  //     { text: ' Support during illness', url: '/34554n5' },
  //     { text: 'Rehabilitation', url: '/ser264' },
  //     { text: ' Disabled persons', url: '/sfdb243' },
  //   ],
  // },

  // { text: ' Health', url: '/theme123', pages: SUBMENU },
  // { text: ' Family', url: '/theme45674745' },
  // { text: ' Leisure', url: '/theme', pages: SUBMENU },
  // { text: ' Information', url: '/theme22362532' },
  // { text: ' About Finland', url: '/sar42342', pages: SUBMENU },
]
