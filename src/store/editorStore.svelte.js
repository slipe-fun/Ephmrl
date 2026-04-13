// store for editor cuz astro islands
class EditorStore {
  editor = $state.raw(null);
  
  updateTrigger = $state(0);
}

export const editorStore = new EditorStore();