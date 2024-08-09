<script setup>
import { ref, onMounted, onBeforeUnmount, inject, defineProps } from 'vue';
import { useRoute } from 'vue-router';
import { useLessonStore } from '@/stores/lessonStore';
import { useMessage } from 'naive-ui';

import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import Youtube from '@tiptap/extension-youtube';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import StarterKit from '@tiptap/starter-kit';
import { Editor, EditorContent, useEditor } from '@tiptap/vue-3';

import FormatBoldIcon from 'vue-material-design-icons/FormatBold.vue';
import FormatItalicIcon from 'vue-material-design-icons/FormatItalic.vue';
import FormatStrikethroughIcon from 'vue-material-design-icons/FormatStrikethrough.vue';
import FormatHeader1Icon from 'vue-material-design-icons/FormatHeader1.vue';
import FormatHeader2Icon from 'vue-material-design-icons/FormatHeader2.vue';
import FormatHeader3Icon from 'vue-material-design-icons/FormatHeader3.vue';
import FormatListBulletedIcon from 'vue-material-design-icons/FormatListBulleted.vue';
import FormatListNumberedIcon from 'vue-material-design-icons/FormatListNumbered.vue';
import CodeBracesIcon from 'vue-material-design-icons/CodeBraces.vue';
import CodeBlockBracesIcon from 'vue-material-design-icons/CodeBlockBraces.vue';
import FormatQuoteCloseIcon from 'vue-material-design-icons/FormatQuoteClose.vue';
import MinusIcon from 'vue-material-design-icons/Minus.vue';
import YoutubeIcon from 'vue-material-design-icons/Youtube.vue';
import ImageEditIcon from 'vue-material-design-icons/ImageEdit.vue';
import LinkVariantIcon from 'vue-material-design-icons/LinkVariant.vue';
import UndoIcon from 'vue-material-design-icons/Undo.vue';
import RedoIcon from 'vue-material-design-icons/Redo.vue';
import FormatAlignLeftIcon from 'vue-material-design-icons/FormatAlignLeft.vue';
import FormatAlignRightIcon from 'vue-material-design-icons/FormatAlignRight.vue';
import FormatAlignCenterIcon from 'vue-material-design-icons/FormatAlignCenter.vue';
import FormatAlignJustifyIcon from 'vue-material-design-icons/FormatAlignJustify.vue';
import ContentSaveIcon from 'vue-material-design-icons/ContentSave.vue';

const content = ref('');
const contentLesson = inject('contentLesson');
const exerciseLesson = inject('exerciseLesson');
const props = defineProps({
  option: { String, require: true }
});
const message = useMessage();

const editor = useEditor({
  extensions: [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit,
    Youtube,
    Image,
    Link,
    TextAlign.configure({
      types: ['heading', 'paragraph']
    })
  ],
  content: ''
});

function setLink() {
  const previousUrl = editor.value.getAttributes('link').href;
  const url = window.prompt('URL', previousUrl);

  // cancelled
  if (url === null) {
    return;
  }
  // empty
  if (url === '') {
    editor.value.chain().focus().extendMarkRange('link').unsetLink().run();
    return;
  }
  // update link
  editor.value.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
}

function addVideo() {
  const url = prompt('Enter YouTube URL');
  editor.value.commands.setYoutubeVideo({
    src: url,
    width: '100%',
    height: 560
  });
}

function addImage() {
  const url = window.prompt('URL');
  if (url) {
    editor.value.chain().focus().setImage({ src: url }).run();
  }
}

function getContent() {
  content.value = editor.value.getHTML();
  if (props.option == 'content') contentLesson.value = editor.value.getHTML();
  else exerciseLesson.value = editor.value.getHTML();
  message.success('Lưu thành công!');
}

const lessonStore = useLessonStore();
const route = useRoute();

async function getDetailLesson() {
  await lessonStore.getDetailLesson(route.query.lessonId);
  if (props.option == 'content') editor.value.commands.setContent(lessonStore.lesson.content);
  else editor.value.commands.setContent(lessonStore.exercise.content);
}

onMounted(() => {
  if (route.query.option == 'edit') {
    getDetailLesson();
  }
});

onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }
});
</script>
<template>
  <div v-if="editor" class="editer-container">
    <div class="control-group">
      <div class="button-group">
        <button
          @click="editor.chain().focus().toggleBold().run()"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          :class="{ 'is-active': editor.isActive('bold') }"
        >
          <FormatBoldIcon title="Bold" />
        </button>
        <button
          @click="editor.chain().focus().toggleItalic().run()"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
        >
          <FormatItalicIcon title="Italic" />
        </button>
        <button
          @click="editor.chain().focus().toggleStrike().run()"
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }"
        >
          <FormatStrikethroughIcon title="Strike" />
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        >
          <FormatHeader1Icon title="Heading 1" />
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        >
          <FormatHeader2Icon title="Heading 2" />
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        >
          <FormatHeader3Icon title="Heading 3" />
        </button>
        <button
          @click="editor.chain().focus().setTextAlign('left').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
        >
          <FormatAlignLeftIcon title="Align Left" />
        </button>
        <button
          @click="editor.chain().focus().setTextAlign('center').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
        >
          <FormatAlignCenterIcon title="Align Center" />
        </button>
        <button
          @click="editor.chain().focus().setTextAlign('right').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
        >
          <FormatAlignRightIcon title="Align Right" />
        </button>
        <button
          @click="editor.chain().focus().setTextAlign('justify').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }"
        >
          <FormatAlignJustifyIcon titl="Align Justify" />
        </button>
        <button
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor.isActive('bulletList') }"
        >
          <FormatListBulletedIcon title="Bulleted List" />
        </button>
        <button
          @click="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'is-active': editor.isActive('orderedList') }"
        >
          <FormatListNumberedIcon title="Numbered List" />
        </button>
        <button
          @click="editor.chain().focus().toggleCode().run()"
          :disabled="!editor.can().chain().focus().toggleCode().run()"
          :class="{ 'is-active': editor.isActive('code') }"
        >
          <CodeBracesIcon title="Code" />
        </button>
        <button
          @click="editor.chain().focus().toggleCodeBlock().run()"
          :class="{ 'is-active': editor.isActive('codeBlock') }"
        >
          <CodeBlockBracesIcon title="Code Block" />
        </button>
        <button
          @click="editor.chain().focus().toggleBlockquote().run()"
          :class="{ 'is-active': editor.isActive('blockquote') }"
        >
          <FormatQuoteCloseIcon title="Quote" />
        </button>
        <button @click="editor.chain().focus().setHorizontalRule().run()">
          <MinusIcon title="Horizontal" />
        </button>
        <button id="add" @click="addVideo">
          <YoutubeIcon title="Add Video Youtube" />
        </button>
        <button @click="addImage">
          <ImageEditIcon title="Add Image" />
        </button>
        <button @click="setLink" :class="{ 'is-active': editor.isActive('link') }">
          <LinkVariantIcon title="Set Link" />
        </button>
        <input
          type="color"
          @input="editor.chain().focus().setColor($event.target.value).run()"
          :value="editor.getAttributes('textStyle').color"
        />
        <button
          @click="editor.chain().focus().undo().run()"
          :disabled="!editor.can().chain().focus().undo().run()"
        >
          <UndoIcon title="Undo" />
        </button>
        <button
          @click="editor.chain().focus().redo().run()"
          :disabled="!editor.can().chain().focus().redo().run()"
        >
          <RedoIcon title="Redo" />
        </button>
        <button @click="getContent()">
          <ContentSaveIcon title="Save" />
        </button>
      </div>
    </div>
    <EditorContent :editor="editor" class="editor" />
  </div>
</template>
<style lang="scss">
/* Basic editor styles */
.editer-container {
  padding: 16px;
  color: #000;
  .control-group {
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 3px solid;
    .is-active {
      background-color: #b8b8b8;
      border-radius: 4px;
    }
    button {
      padding: 4px;
      span {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      &:not(:last-child) {
        margin-right: 4px;
      }
    }
    .button-group {
      display: flex;
      flex-wrap: wrap;
    }
    .editor {
      > div {
        height: 500px;
      }
    }
  }
}
.tiptap {
  padding: 8px;
  :first-child {
    margin-top: 0;
  }
  a {
    color: blue;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }

  img {
    display: block;
    height: auto;
    margin: 1.5rem 0;
    max-width: 100%;

    &.ProseMirror-selectednode {
      outline: 3px solid #000;
    }
  }
  /* List styles */
  ul,
  ol {
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;

    li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }

  /* Heading styles */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
    margin-top: 2.5rem;
    text-wrap: pretty;
  }

  h1,
  h2 {
    margin-top: 3.5rem;
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 1.4rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  h3 {
    font-size: 1.1rem;
  }

  h4,
  h5,
  h6 {
    font-size: 1rem;
  }

  /* Code and preformatted text styles */
  code {
    background-color: plum;
    border-radius: 0.4rem;
    color: #000;
    font-size: 0.85rem;
    padding: 0.25em 0.3em;
  }

  pre {
    background: #4c4c4c;
    border-radius: 0.5rem;
    color: #fff;
    font-family: 'JetBrainsMono', monospace;
    margin: 1.5rem 0;
    padding: 0.75rem 1rem;

    code {
      background: none;
      color: inherit;
      font-size: 0.8rem;
      padding: 0;
    }
  }

  blockquote {
    border-left: 3px solid #ccc;
    margin: 1.5rem 0;
    padding-left: 1rem;
  }

  hr {
    border: none;
    border-top: 1px solid #ccc;
    margin: 2rem 0;
  }
}
</style>
