import { v4 as uuidv4 } from 'uuid';
// 这个函数要生成一个随机字符串，且每次执行不能发生变化，游客身份持久存储（localStorage）
export const getUUID = () => {
  // 先从本地存储获取uuid（检查是否已经有了）
  let uuid_token = localStorage.getItem('UUIDTOKEN');
  // 如果没有就生成游客临时身份,本地存储存一次
  if (!uuid_token) {
    uuid_token = uuidv4();
    localStorage.setItem('UUIDTOKEN', uuid_token);
  }
  return uuid_token;
}