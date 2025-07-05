import {
  MinimalTiptapEditor,
  type MinimalTiptapProps,
} from '@/components/ui/minimal-tiptap'

const RichEditor: React.FC<
  Omit<
    MinimalTiptapProps & React.RefAttributes<HTMLDivElement>,
    'editorClassName' | 'editorContentClassName' | 'output'
  >
> = props => {
  return (
    <MinimalTiptapEditor
      editorClassName="focus:outline-hidden h-full"
      editorContentClassName="p-6 overflow-auto h-full"
      output="html"
      {...props}
    />
  )
}

export default RichEditor
