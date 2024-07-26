import React, { useState, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Ensure quill-mention is correctly imported
import QuillMention from 'quill-mention';
import { mentionModuleData } from './mentionConfig';
// Register the mention module and blot
Quill.register('modules/mention', QuillMention);

export const TextEditor = ({ value, onChange, toolbarOptions, placeholder, userInfo }) => {

  console.log('ii', userInfo)

  useEffect(() => {
    // Custom patch for replacing deprecated DOMNodeInserted
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Handle the newly inserted node
          const addedNode = mutation.addedNodes[0];
          // Your logic for the added node
        }
      });
    });

    // Start observing
    observer.observe(document, {
      childList: true,
      subtree: true
    });

    // Clean up observer on unmount
    return () => observer.disconnect();
  }, []);

 

  const modules = {
    toolbar: toolbarOptions || [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['mention'], // Include mention in the toolbar if needed
    ],
    clipboard: {
      matchVisual: false,
    },
    mention: mentionModuleData({data: userInfo}),
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline',
    'list', 'bullet', 'indent',
    'link', 'image',
    'mention',
  ];

  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      // userInfo={userInfo}
      placeholder={placeholder ? placeholder : "Write a comment..."}
    />
  );
};
