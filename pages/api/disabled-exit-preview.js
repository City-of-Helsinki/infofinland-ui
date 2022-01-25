export default async function exit(_, response) {
  console.log(_, response)
  response.clearPreviewData()

  response.writeHead(307, { Location: '/' })
  response.end()
}
