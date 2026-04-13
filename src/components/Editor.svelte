<script>
  import { onMount, onDestroy } from "svelte";
  import { Editor } from "@tiptap/core";
  import StarterKit from "@tiptap/starter-kit";
  import { Markdown } from "@tiptap/markdown";
  import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
  import { common, createLowlight } from "lowlight";
  import Placeholder from "@tiptap/extension-placeholder";
  
  import { editorStore } from "@/store/editorStore.svelte.js";

  let element;
  const lowlight = createLowlight(common);

  onMount(() => {
    editorStore.editor = new Editor({
      element: element,
      extensions:[
        StarterKit,
        Placeholder.configure({
          placeholder: "Write a new post...",
        }),
        CodeBlockLowlight.configure({
          lowlight,
        }),
        Markdown,
      ],
      content: "",
      editorProps: {
        attributes: {
          class:
            "prose-p:font-serif prose-text prose:font-sans max-[920px]:prose-lg prose-xl max-w-none focus:outline-none min-h-[300px] prose-headings:font-bold prose-a:text-blue-600 prose-headings:text-2xl prose-headings:font-bold prose-headings:mt-6 prose-headings:mb-3",
        },
      },
      onTransaction: () => {
        editorStore.updateTrigger++;
      }
    });
  });

  onDestroy(() => {
    if (editorStore.editor) {
      editorStore.editor.destroy();
      editorStore.editor = null;
    }
  });
</script>

<div bind:this={element} class="w-full"></div>

<style>
  @reference "../styles/global.css";

  :global(.tiptap p.is-editor-empty:first-child::before) {
    content: attr(data-placeholder);
    float: left;
    @apply h-0 pointer-events-none font-serif text-secondaryText;
  }
</style>