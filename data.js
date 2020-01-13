const data = [
    {
        title: 'bear',
        summary: 'bear is strong',
        isPredator: true,
        danger: 5,
    },
    {
        title: 'pig',
        summary: 'pig is unclean',
        isPredator: false,
        danger: 2,
    },
    {
        title: 'cat',
        summary: 'cat is magical',
        isPredator: true,
        danger: 2,
    },
    {
        title: 'rabbit',
        summary: 'rabbit is cowardly',
        isPredator: false,
        danger: 1,
    },
    {
        title: 'elephant',
        summary: 'elephant is big',
        isPredator: false,
        danger: 4,
    },
    {
        title: 'wolf',
        summary: 'wolf is angry',
        isPredator: true,
        danger: 5,
    },
    {
        title: 'fox',
        summary: 'fox is sly',
        isPredator: true,
        danger: 3,
    },
    {
        title: 'lion',
        summary: 'lion is king of the animals',
        isPredator: true,
        danger: 5,
    },
    {
        title: 'octopus',
        summary: 'octopus has eight paws ',
        isPredator: true,
        danger: 3,
    },

    {
        title: 'dog',
        summary: 'dog is good',
        isPredator: true,
        danger: 2,
    },
    {
        title: 'horse',
        summary: 'horse is hardy',
        isPredator: false,
        danger: 3,
    },
    {
        title: 'cow',
        summary: 'cow gives milk',
        isPredator: false,
        danger: 3,
    },
    {
        title: 'deer',
        summary: 'deer is horned ',
        isPredator: false,
        danger: 4,
    },
    {
        title: 'shark',
        summary: 'shark is very dangerous ',
        isPredator: true,
        danger: 5,
    },
    {
        title: 'tiger',
        summary: 'tiger is striped ',
        isPredator: true,
        danger: 5,
    },
    {
        title: 'turtle',
        summary: 'turtle is slow ',
        isPredator: false,
        danger: 1,
    },
    {
        title: 'giraffe',
        summary: 'giraffe is tall ',
        isPredator: false,
        danger: 4,
    },
    {
        title: 'squirrel',
        summary: 'squirrel climbs trees ',
        isPredator: false,
        danger: 1,
    },
    {
        title: 'leopard',
        summary: 'leopard is spotted ',
        isPredator: true,
        danger: 5,
    },
    {
        title: 'snake',
        summary: 'snake is poisonous ',
        isPredator: true,
        danger: 4,
    },
    {
        title: 'sheep',
        summary: 'sheep is curly ',
        isPredator: false,
        danger: 2,
    },
    {
        title: 'dolphin',
        summary: 'dolphin is friendly',
        isPredator: false,
        danger: 2,
    },
    {
        title: 'alligator',
        summary: 'alligator is toothy',
        isPredator: true,
        danger: 5,
    },
    {
        title: 'hippopotamus',
        summary: 'hippopotamus is big',
        isPredator: false,
        danger: 4,
    },
    {
        title: 'kangaroo',
        summary: 'kangaroo has a bag ',
        isPredator: false,
        danger: 3,
    },
    {
        title: 'rhinoceros',
        summary: 'rhinoceros has a horn ',
        isPredator: false,
        danger: 4,
    },
    {
        title: 'whale',
        summary: 'whale is huge ',
        isPredator: false,
        danger: 4,
    },
    {
        title: 'dinosaur',
        summary: 'dinosaur extinct',
        isPredator: true,
        danger: 5,
    },
];

export default data.map((item, index) => {
    return {
        id: index + 1,
        title: {
            src: `https://en.wikipedia.org/wiki/${item.title}`,
            text: item.title,
        },
        image: `https://img.icons8.com/color/48/000000/${item.title}.png`,
        summary: item.summary,
        isPredator: item.isPredator,
        danger: item.danger,
    };
});