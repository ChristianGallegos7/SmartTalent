import type { CVExtractedData } from '../types'

/**
 * Extrae datos estructurados de un CV PDF usando IA.
 *
 * Implementación producción: POST a API Gateway → Lambda → Amazon Textract
 * Configurar: VITE_AWS_CV_API_URL en .env
 */
export async function extractCVData(_file: File): Promise<CVExtractedData> {
  // TODO: Reemplazar con llamada real a AWS
  // const formData = new FormData()
  // formData.append('file', _file)
  // const res = await fetch(`${import.meta.env.VITE_AWS_CV_API_URL}/extract`, {
  //   method: 'POST',
  //   body: formData,
  // })
  // if (!res.ok) throw new Error('Error al procesar el CV')
  // return res.json() as Promise<CVExtractedData>

  await new Promise(r => setTimeout(r, 2200))

  return {
    skills: ['JavaScript', 'React', 'TypeScript', 'Node.js', 'CSS', 'Git'],
    education: ['Ingeniería en Sistemas de Computación – UNAM (2020)'],
    languages: ['Español (nativo)', 'Inglés (B2)'],
    experienceYears: 3,
    summary:
      'Desarrollador web con 3 años de experiencia construyendo aplicaciones modernas. Especializado en el ecosistema JavaScript/TypeScript con enfoque en rendimiento y buenas prácticas.',
  }
}
