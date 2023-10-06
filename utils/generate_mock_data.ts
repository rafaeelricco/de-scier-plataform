import _ from 'lodash'

const blockchainItems = _.times(80, (i) => {
   const accessTypeSample = _.sample(['open', 'paid', null])
   let statusSample

   if (accessTypeSample === 'open') {
      statusSample = _.sample(['published', null])
   } else {
      statusSample = _.sample(['pending', 'approved', 'final_approved', 'rejected'])
   }

   return {
      id: (i + 1).toString(),
      status: statusSample,
      added_as: _.sample(['reviewer', 'editor']),
      published: Math.random() < 0.5,
      published_date:
         Math.random() < 0.5 ? `2023-${_.padStart(((i % 12) + 1).toString(), 2, '0')}-10` : null,
      access_type: accessTypeSample,
      likes: Math.random() < 0.5 ? _.random(0, 1000) : null,
      views: Math.random() < 0.5 ? _.random(0, 5000) : null,
      image: [
         `https://random.imagecdn.app/100/100`,
         `https://random.imagecdn.app/120/120`,
         `https://random.imagecdn.app/130/130`,
         `https://random.imagecdn.app/140/140`,
         `https://random.imagecdn.app/150/150`,
         `https://random.imagecdn.app/160/160`,
         `https://random.imagecdn.app/170/170`,
         `https://random.imagecdn.app/180/180`,
         `https://random.imagecdn.app/190/190`,
         `https://random.imagecdn.app/200/200`
      ][i % 3],
      since: `2023-${_.padStart(((i % 12) + 1).toString(), 2, '0')}-01`,
      title: `Blockchain Topic ${i + 1}`,
      link: `https://example.com/blockchain-topic-${i + 1}`
   }
})

console.log(JSON.stringify(blockchainItems, null, 2))
