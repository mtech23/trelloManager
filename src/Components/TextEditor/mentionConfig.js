let users = [];

export const mentionModuleData = (props) => {
  const userInitialData = [...props.data];
  console.log('userInitialData', userInitialData);

  users = userInitialData?.map((item, index) => {
    return { id: item.id, value: item.username }
  })


console.log('usersusers',users);
}


export const mentionModule = {
  allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
  mentionDenotationChars: ['@'],
  source: (searchTerm, renderList) => {
    console.log('Mention source function called', searchTerm);
    if (searchTerm.length === 0) {
      renderList(users, searchTerm);
    } else {
      const matches = users.filter(user =>
        user.value.toLowerCase().includes(searchTerm.toLowerCase())
      );
      renderList(matches, searchTerm);
    }
  },
};



