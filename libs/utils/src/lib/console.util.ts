export function logError(type: string, err: any) {
  console.log(
    `%c${type} Failed`,
    'font-weight: 400; background-color: #f44336; color: white; padding: 5px; border-radius: 2px;',
    err
  );
}

export function logSuccess(type: string, result: any) {
  console.log(
    `%c${type} Succeed`,
    'font-weight: 400; background-color: #4caf50; color: white; padding: 5px; border-radius: 2px;',
    result
  );
}
