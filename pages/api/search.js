// import { Client } from "@elastic/elasticsearch";
// import getConfig from "next/config";
// import { getClient } from "@/lib/elasticsearch"
// export const getClient = ()=> {

//   const config = getConfig().serverRuntimeConfig
//   const url = config.ELASTICSEARCH_URL;
//   const { elasticsearch_password, ELASTICSEARCH_URL, elasticsearch_certificate } = config

//   if (!ELASTICSEARCH_URL) throw "Set ELASTICSEARCH_URL";

//   if (!config.elasticsearch_password && !config.elasticsearch_password) {
//     return new Client({ node: ELASTICSEARCH_URL });
//   }

//   return new Client({
//     node: url,
//     auth: {
//       username: "elastic",
//       password: elasticsearch_password || "changeme",
//     },
//     ssl: {
//       ca: elasticsearch_certificate,
//       rejectUnauthorized: false,
//     }
//   });
// }

// import SEARCH_RESULTS from '@/MOCK_SEARCH'

export default function handler(req, res) {

  const { search:q } = req?.query
  // Mocking empty results for page testing
  // Change test implementation when we have real search API

  const results = q === '_' ? [] :  []

  // const results = getClient().search({q})

  res.status(200).json({
    // search,
    results,
  })
}
