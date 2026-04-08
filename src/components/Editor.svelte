<script>
  import { onMount, onDestroy } from "svelte";
  import { Editor } from "@tiptap/core";
  import StarterKit from "@tiptap/starter-kit";
  import { Markdown } from "@tiptap/markdown";

  import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
  import { common, createLowlight } from "lowlight";
  import Placeholder from "@tiptap/extension-placeholder";

  let element;
  let editor;

  const lowlight = createLowlight(common);

  onMount(() => {
    editor = new Editor({
      element: element,
      extensions: [
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

      contentType: "markdown",

      editorProps: {
        attributes: {
          class:
            "prose-p:font-serif prose-text prose:font-sans max-[920px]:prose-lg prose-xl max-w-none focus:outline-none min-h-[300px] prose-headings:font-bold prose-a:text-blue-600 prose-headings:text-2xl prose-headings:font-bold prose-headings:mt-6 prose-headings:mb-3",
        },
      },
    });
  });

  onDestroy(() => {
    if (editor) editor.destroy();
  });

  function toggleBold() {
    editor.chain().focus().toggleBold().run();
  }
</script>

<div class="editor-wrapper">
  {#if editor}
    <div class="flex gap-2 mb-4">
      <button
        on:click={toggleBold}
        class="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
        class:font-bold={editor.isActive("bold")}
      >
        Жирный (B)
      </button>

      <button
        on:click={() => editor.chain().focus().toggleCodeBlock().run()}
        class="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
        class:bg-gray-300={editor.isActive("codeBlock")}
      >
        Блок кода ()
      </button>
    </div>
  {/if}

  <div bind:this={element} class="w-full"></div>
</div>

<style>
  @reference "../styles/global.css";

  :global(.tiptap p.is-editor-empty:first-child::before) {
    content: attr(data-placeholder);
    float: left;

    @apply h-0 pointer-events-none font-serif text-secondaryText;
  }
</style>
