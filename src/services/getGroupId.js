export function getGroupId(groups) {
  const ids = groups.map((group) => {
    return parseInt(group.id.substr(1))
  });

  return 'g' + (Math.max.apply(null, ids) + 1);

}