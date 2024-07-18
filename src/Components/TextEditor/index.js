import React, { useState, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Ensure quill-mention is correctly imported
import QuillMention from 'quill-mention';

// Register the mention module and blot
Quill.register('modules/mention', QuillMention);

export const TextEditor = ({ value, onChange, toolbarOptions, placeholder }) => {

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

  const users = [
    { id: 1, value: 'John Doe' },
    { id: 2, value: 'Jane Smith' },
    { id: 3, value: 'Michael Brown' },
  ];

  const mentionModule = {
    allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
    mentionDenotationChars: ['@'],
    source: (searchTerm, renderList, mentionChar) => {
      console.log('Mention source function called', searchTerm);
      if (searchTerm.length === 0) {
        renderList(users, searchTerm);
      } else {
        const matches = users.filter((user) =>
          user.value.toLowerCase().includes(searchTerm.toLowerCase())
        );
        renderList(matches, searchTerm);
      }
    },
  };

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
    // mention: mentionModule,
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
      placeholder={placeholder || "Write a comment..."}
    />
  );
};
