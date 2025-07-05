import { MinimalTiptapEditor } from '@/components/ui/minimal-tiptap'
import type { I_RichEditorProps } from '../types'

const RichEditor: React.FC<I_RichEditorProps> = ({
  value,
  onChange,
  className,
}) => {
  return (
    <MinimalTiptapEditor
      value={value}
      onChange={onChange}
      className={className}
      editorContentClassName="p-5 overflow-auto h-full"
      output="html"
      placeholder="Cats and dogs..."
      autofocus={true}
      editable={true}
      editorClassName="focus:outline-hidden h-full"
    />
  )
}

export default RichEditor
