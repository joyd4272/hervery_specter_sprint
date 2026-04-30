import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {portfolio} from './src/sanity/schemas/portfolio'

export default defineConfig({
  name: 'h-studio',
  title: 'H.Studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: '/studio',
  plugins: [structureTool()],
  schema: {
    types: [portfolio],
  },
})
