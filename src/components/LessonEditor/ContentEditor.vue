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
import BulletList from '@tiptap/extension-bullet-list';
import StarterKit from '@tiptap/starter-kit';
import { Editor, EditorContent, useEditor } from '@tiptap/vue-3';

import BordIcon from 'vue-material-design-icons/FormatBold.vue';
import ItalicIcon from 'vue-material-design-icons/FormatItalic.vue';
import StrikeIcon from 'vue-material-design-icons/formatStrikethrough.vue';
import Header1Icon from 'vue-material-design-icons/formatHeader1.vue';
import Header2Icon from 'vue-material-design-icons/formatHeader2.vue';
import Header3Icon from 'vue-material-design-icons/formatHeader3.vue';
import ListBulletedIcon from 'vue-material-design-icons/listBox.vue';
import ListNumberedIcon from 'vue-material-design-icons/formatListNumbered.vue';
import codeBracesIcon from 'vue-material-design-icons/codeBraces.vue';
import codeBlcokBracesIcon from 'vue-material-design-icons/codeBlockBraces.vue';
import quoteIcon from 'vue-material-design-icons/formatQuoteClose.vue';
import horizontalIcon from 'vue-material-design-icons/minus.vue';
import youtubeIcon from 'vue-material-design-icons/youtube.vue';
import imageIcon from 'vue-material-design-icons/imageEdit.vue';
import linkIcon from 'vue-material-design-icons/linkVariant.vue';
import undoIcon from 'vue-material-design-icons/undo.vue';
import redoIcon from 'vue-material-design-icons/redo.vue';
import alignLeftIcon from 'vue-material-design-icons/formatAlignLeft.vue';
import alignRightIcon from 'vue-material-design-icons/formatAlignRight.vue';
import alignCenterIcon from 'vue-material-design-icons/formatAlignCenter.vue';
import alignJustifyIcon from 'vue-material-design-icons/formatAlignJustify.vue';
import saveIcon from 'vue-material-design-icons/contentSave.vue';

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
    BulletList,
    TextStyle,
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
          <BordIcon title="Bold" />
        </button>
        <button
          @click="editor.chain().focus().toggleItalic().run()"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          :class="{ 'is-active': editor.isActive('italic') }"
        >
          <ItalicIcon title="Italic" />
        </button>
        <button
          @click="editor.chain().focus().toggleStrike().run()"
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          :class="{ 'is-active': editor.isActive('strike') }"
        >
          <StrikeIcon title="Strike" />
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
        >
          <Header1Icon title="Heading 1" />
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
        >
          <Header2Icon title="Heading 2" />
        </button>
        <button
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
          :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
        >
          <Header3Icon title="Heading 3" />
        </button>
        <button
          @click="editor.chain().focus().setTextAlign('left').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
        >
          <alignLeftIcon title="Align Left" />
        </button>
        <button
          @click="editor.chain().focus().setTextAlign('center').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
        >
          <alignCenterIcon title="Align Center" />
        </button>
        <button
          @click="editor.chain().focus().setTextAlign('right').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
        >
          <alignRightIcon title="Align Right" />
        </button>
        <button
          @click="editor.chain().focus().setTextAlign('justify').run()"
          :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }"
        >
          <alignJustifyIcon titl="Align Justify" />
        </button>
        <button
          @click="editor.chain().focus().toggleBulletList().run()"
          :class="{ 'is-active': editor.isActive('bulletList') }"
        >
          <ListBulletedIcon title="Bulleted List" />
        </button>
        <button
          @click="editor.chain().focus().toggleOrderedList().run()"
          :class="{ 'is-active': editor.isActive('orderedList') }"
        >
          <ListNumberedIcon title="Numbered List" />
        </button>
        <button
          @click="editor.chain().focus().toggleCode().run()"
          :disabled="!editor.can().chain().focus().toggleCode().run()"
          :class="{ 'is-active': editor.isActive('code') }"
        >
          <codeBracesIcon title="Code" />
        </button>
        <button
          @click="editor.chain().focus().toggleCodeBlock().run()"
          :class="{ 'is-active': editor.isActive('codeBlock') }"
        >
          <codeBlcokBracesIcon title="Code Block" />
        </button>
        <button
          @click="editor.chain().focus().toggleBlockquote().run()"
          :class="{ 'is-active': editor.isActive('blockquote') }"
        >
          <quoteIcon title="Quote" />
        </button>
        <button @click="editor.chain().focus().setHorizontalRule().run()">
          <horizontalIcon title="Horizontal" />
        </button>
        <button id="add" @click="addVideo">
          <youtubeIcon title="Add Video Youtube" />
        </button>
        <button @click="addImage">
          <imageIcon title="Add Image" />
        </button>
        <button @click="setLink" :class="{ 'is-active': editor.isActive('link') }">
          <linkIcon title="Set Link" />
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
          <undoIcon title="Undo" />
        </button>
        <button
          @click="editor.chain().focus().redo().run()"
          :disabled="!editor.can().chain().focus().redo().run()"
        >
          <redoIcon title="Redo" />
        </button>
        <button @click="getContent()">
          <saveIcon title="Save" />
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
