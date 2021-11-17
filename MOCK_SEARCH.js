const r = [
  {
    title: 'Hello result',
    url: '/hello',
    excerpt:
      'Suomessa saat esitäytetyn veroilmoituksen verohallinnosta… …saat esitäytetyn veroilmoituksen verohallinnosta postissa… …postissa tai sähköisessä palvelussa. Veroilmoituksen perusteella…',
  },
  {
    title: 'Hello Two',
    url: '/hello/two',
    path: [{ title: 'hello', url: '/hello' }],
    excerpt:
      'Suomessa saat esitäytetyn veroilmoituksen verohallinnosta… …saat esitäytetyn veroilmoituksen verohallinnosta postissa… …postissa tai sähköisessä palvelussa. Veroilmoituksen perusteella…',
  },
  {
    title: 'Hello Two Two',
    url: '/hello/two/two',
    path: [
      { title: 'hello', url: '/hello' },
      { title: 'hello two', url: '/hello/two' },
    ],
    excerpt:
      'Suomessa saat esitäytetyn veroilmoituksen verohallinnosta… …saat esitäytetyn veroilmoituksen verohallinnosta postissa… …postissa tai sähköisessä palvelussa. Veroilmoituksen perusteella…',
  },
]

export default r
