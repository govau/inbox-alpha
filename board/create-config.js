if (!process.env.GRAPHQL_HOST) {
  throw new Error('Required environment variable GRAPHQL_HOST not set')
}

const config = { graphqlHost: process.env.GRAPHQL_HOST }

process.stdout.write(JSON.stringify(config))
