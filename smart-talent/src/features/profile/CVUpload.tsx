import { useState, useRef, type DragEvent, type ChangeEvent } from 'react'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { extractCVData } from '../../services/cvService'
import type { CVData } from '../../types'

interface Props {
  currentCV?: CVData
  onSave: (cv: CVData) => void
}

const formatSize = (bytes: number) => {
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1048576).toFixed(1)} MB`
}

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })

export function CVUpload({ currentCV, onSave }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [pendingFile, setPendingFile] = useState<File | null>(null)
  const [pendingBase64, setPendingBase64] = useState('')
  const [isDragOver, setIsDragOver] = useState(false)
  const [isExtracting, setIsExtracting] = useState(false)
  const [error, setError] = useState('')

  const processFile = async (file: File) => {
    if (file.type !== 'application/pdf') {
      setError('Solo se aceptan archivos PDF.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('El archivo no debe superar 5 MB.')
      return
    }
    setError('')
    const base64 = await fileToBase64(file)
    setPendingFile(file)
    setPendingBase64(base64)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) processFile(file)
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) processFile(file)
  }

  const handleExtract = async () => {
    if (!pendingFile) return
    setIsExtracting(true)
    setError('')
    try {
      const extractedData = await extractCVData(pendingFile)
      onSave({
        fileName: pendingFile.name,
        fileSize: pendingFile.size,
        base64: pendingBase64,
        uploadedAt: new Date().toISOString(),
        extractedData,
      })
      setPendingFile(null)
      setPendingBase64('')
    } catch {
      setError('Error al analizar el CV. Inténtalo de nuevo.')
    }
    setIsExtracting(false)
  }

  const openCV = (base64: string) => {
    const a = document.createElement('a')
    a.href = base64
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    a.click()
  }

  return (
    <div className="space-y-5">
      {currentCV && !pendingFile && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
          <span className="text-2xl shrink-0">📄</span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-green-900 truncate">{currentCV.fileName}</p>
            <p className="text-xs text-green-600">{formatSize(currentCV.fileSize)}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button onClick={() => openCV(currentCV.base64)} className="text-xs text-blue-600 hover:underline font-medium">
              Ver CV
            </button>
            <span className="text-gray-300">|</span>
            <button onClick={() => inputRef.current?.click()} className="text-xs text-gray-500 hover:underline">
              Reemplazar
            </button>
          </div>
        </div>
      )}

      {!pendingFile && !isExtracting && (
        <div
          onDrop={handleDrop}
          onDragOver={e => { e.preventDefault(); setIsDragOver(true) }}
          onDragLeave={() => setIsDragOver(false)}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
            ${isDragOver
              ? 'border-blue-400 bg-blue-50'
              : 'border-gray-300 hover:border-blue-300 hover:bg-gray-50'}`}
        >
          <p className="text-3xl mb-3">📁</p>
          <p className="text-sm font-medium text-gray-700">
            {currentCV ? 'Sube un nuevo CV' : 'Arrastra tu CV aquí'}
          </p>
          <p className="text-xs text-gray-400 mt-1">O haz click para seleccionar · PDF · Máx. 5 MB</p>
        </div>
      )}

      <input ref={inputRef} type="file" accept="application/pdf" onChange={handleInputChange} className="hidden" />

      {pendingFile && !isExtracting && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xl">📄</span>
            <div>
              <p className="text-sm font-semibold text-blue-900">{pendingFile.name}</p>
              <p className="text-xs text-blue-600">{formatSize(pendingFile.size)}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleExtract} className="flex-1">
              ✨ Analizar CV con IA
            </Button>
            <Button variant="secondary" onClick={() => setPendingFile(null)}>
              Cancelar
            </Button>
          </div>
        </div>
      )}

      {isExtracting && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
          <p className="text-2xl mb-2 animate-pulse">🤖</p>
          <p className="text-sm font-medium text-blue-800">Analizando CV con IA...</p>
          <p className="text-xs text-blue-600 mt-1">Extrayendo habilidades, experiencia y formación</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {currentCV?.extractedData && (
        <div className="border border-gray-200 rounded-xl p-5 space-y-4">
          <h4 className="text-sm font-semibold text-gray-900">Información extraída</h4>

          <div>
            <p className="text-xs font-medium text-gray-400 mb-1.5">RESUMEN</p>
            <p className="text-sm text-gray-700 leading-relaxed">{currentCV.extractedData.summary}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-400 mb-1.5">HABILIDADES</p>
            <div className="flex flex-wrap gap-1.5">
              {currentCV.extractedData.skills.map(s => (
                <Badge key={s} variant="blue">{s}</Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-medium text-gray-400 mb-1.5">FORMACIÓN</p>
              <ul className="space-y-1">
                {currentCV.extractedData.education.map(e => (
                  <li key={e} className="text-xs text-gray-700">• {e}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 mb-1.5">IDIOMAS</p>
              <ul className="space-y-1">
                {currentCV.extractedData.languages.map(l => (
                  <li key={l} className="text-xs text-gray-700">• {l}</li>
                ))}
              </ul>
            </div>
          </div>

          {currentCV.extractedData.experienceYears !== undefined && (
            <div>
              <p className="text-xs font-medium text-gray-400 mb-1">EXPERIENCIA</p>
              <p className="text-sm text-gray-700">{currentCV.extractedData.experienceYears} años</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
