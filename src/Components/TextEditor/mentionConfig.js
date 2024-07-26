export const mentionModuleData = (props) => {
  console.log('checl', props?.data)

  const users = [
    {
      value: 'saif',
      id: 1
    },
    {
      value: 'waleed',
      id: 1
    }
  ]
  const mentionModule = {
    allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
    mentionDenotationChars: ['@'],
    source: (searchTerm, renderList) => {
      console.log('Mention source function called', searchTerm);
      if (searchTerm.length === 0) {
        renderList(users, searchTerm);
      } else {
        const matches = users?.filter(user =>
          user?.value?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        renderList(matches, searchTerm);
      }
    },
  };

  return mentionModule;
}
