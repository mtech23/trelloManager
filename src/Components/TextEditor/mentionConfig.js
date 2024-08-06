const users = [
  { id: 1, value: "John Doe" },
  { id: 2, value: "Jane Smith" },
  { id: 3, value: "Michael Brown" },
];

export const mentionModule = {
  allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
  mentionDenotationChars: ["@"],
  source: (searchTerm, renderList) => {
    console.log("Mention source function called", searchTerm);
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
