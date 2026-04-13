<script>
  import { Icons } from "@/lib/icons";
  import { editorStore } from "@/store/editorStore.svelte.js";

  let { logo } = $props()

  let isBold = $derived.by(() => {
     editorStore.updateTrigger;
     return editorStore.editor?.isActive("bold") ?? false
    });
  let isCodeBlock = $derived.by(() => {
     editorStore.updateTrigger;
     return editorStore.editor?.isActive("codeBlock") ?? false
    });

  function toggleBold() {
    editorStore.editor?.chain().focus().toggleBold().run();
  }

  function toggleCodeBlock() {
    editorStore.editor?.chain().focus().toggleCodeBlock().run();
  }
</script>

<aside class="flex flex-col gap-4 pt-7.5 pr-4 sticky top-0 h-screen">
  <a
    href="/"
    class="hover:opacity-50 duration-150 ease-in-out"
    title="Publication"
  >
    <img src={logo} alt="Logo" class="size-11" />
  </a>

  <div class="w-6 h-px bg-border mx-auto my-1"></div>

  <button
  onclick={toggleBold}
    class="size-11 rounded-full grid place-items-center active:scale-90 {isBold ? 'bg-primary' : 'bg-foreground'} hover:opacity-50 duration-150 ease-in-out cursor-pointer"
  >
    <Icons.title class="{isBold ? 'text-background' : 'text-text'} duration-150 ease-in-out w-6" />
  </button>

  <button
    onclick={toggleCodeBlock}
    class="size-11 rounded-full grid place-items-center active:scale-90 {isCodeBlock ? 'bg-primary' : 'bg-foreground'} hover:opacity-50 duration-150 ease-in-out cursor-pointer"
  >
    <Icons.code class="{isCodeBlock ? 'text-background' : 'text-text'} duration-150 ease-in-out w-6" />
  </button>
</aside>
