function trimStartBy(target: string, seperator: string): string {
  let index = target.indexOf(seperator);
  while (index == 0) {
    target = target.substring(1);
    index = target.indexOf(seperator);
  }
  return target;
}

function getTimestamp(): string{
  return Date.now().toString();
}

export { trimStartBy, getTimestamp };
