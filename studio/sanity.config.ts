import { defineConfig } from 'sanity'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'techbits-studio',
  title: 'Techbits Studio',
  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID || 'your_project_id',
  dataset: process.env.SANITY_STUDIO_API_DATASET || 'production',
  schema: { types: schemaTypes },
})
