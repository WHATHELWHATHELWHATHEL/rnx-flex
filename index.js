const DIRECTION = [
  { type: 'row', name: 'ROW' },
  { type: 'column', name: 'COL' },
];

const JUSTIFY_CONTENT = [
  { type: 'flex-start', name: 'S' },
  { type: 'center', name: 'C' },
  { type: 'flex-end', name: 'E' },
  { type: 'space-around', name: 'A' },
  { type: 'space-between', name: 'B' },
];

const ALIGN_ITEMS = [
  { type: 'flex-start', name: 'S' },
  { type: 'center', name: 'C' },
  { type: 'flex-end', name: 'E' },
  { type: 'stretch', name: 'T' },
];

const createLayoutObject = (directionType, justifyType, alignType) => ({
  flexDirection: directionType,
  justifyContent: justifyType,
  alignItems: alignType,
});

const createName = (directionName, justifyName, alignName) => (
  directionName === 'ROW' ?
  `${directionName}_V${alignName}_H${justifyName}` :
  `${directionName}_V${justifyName}_H${alignName}`
);

const generateLayoutObjectsFromAlign = (
  directionType, justifyType, directionName, justifyName,
) => (
  ALIGN_ITEMS.reduce(
    (accu, { type: alignType, name: alignName }) => ({
      ...accu,
      [createName(directionName, justifyName, alignName)]: createLayoutObject(directionType, justifyType, alignType),
    }),
    {},
  )
);

const generateLayoutObjectsFromJustify = (directionType, directionName) => (
  JUSTIFY_CONTENT.reduce(
    (accu, { type: justifyType, name: justifyName }) => ({
      ...accu,
      ...generateLayoutObjectsFromAlign(directionType, justifyType, directionName, justifyName),
    }),
    {},
  )
);

const generateLayoutObjectsFromDirection = () => (
  DIRECTION.reduce(
    (accu, { type: directionType, name: directionName }) => ({
      ...accu,
      ...generateLayoutObjectsFromJustify(directionType, directionName),
    }),
    {},
  )
);

const result = generateLayoutObjectsFromDirection();

module.exports = {
  ...result
};
