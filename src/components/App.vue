<template>
  <div>
    <FilePanel
      ref="filePanel"
      @open="openHandler"
      @rename="renameHandler"
      @remove="removeHandler"
      id="filepanel"
    ></FilePanel>
    <CodePanel
      ref="codePanel"
      @save="saveHandler"
      @close="closeHandler"
      id="codepanel"
    ></CodePanel>
  </div>
</template>

<script>
import FilePanel from "./FilePanel.vue";
import CodePanel from "./CodePanel.vue";
import PreImportedNodes from "../preimported.js";

export default {
  data: function() {
    return {};
  },
  methods: {
    openHandler: function(regId, title, content) {
      this.$refs.codePanel.openTab(regId, title, content);
    },
    renameHandler: function(regId, title) {
      this.$refs.codePanel.rename(regId, title);
    },
    removeHandler: function(regId) {
      this.$refs.codePanel.remove(regId);
    },
    saveHandler: function(regId, content) {
      this.$refs.filePanel.save(regId, content);
    },
    closeHandler: function(regId) {
      this.$refs.filePanel.close(regId);
    },
    keypressHandler: function(e) {
      if (e.ctrlKey) {
        if (e.code === "Enter") {
          this.$refs.codePanel.run();
        } else if (e.code === "KeyS") {
          this.$refs.codePanel.save();
          e.preventDefault();
        }
      }
    },
  },
  created: function() {
    document.addEventListener("keydown", this.keypressHandler.bind(this));
  },
  mounted: function() {
    this.openHandler(
      0,
      PreImportedNodes[0].title,
      PreImportedNodes[0].data.content
    );
    this.$refs.codePanel.run();
  },
  components: { FilePanel, CodePanel },
};
</script>

<style>
@media (min-width: 30rem) {
  #filepanel {
    width: 20rem;
    float: left;
    background-color: rgb(9, 22, 29);
  }
  #codepanel {
    margin-left: 20.5rem;
  }
}
</style>
