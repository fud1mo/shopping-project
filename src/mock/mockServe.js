// 先引入mockjs模块
import Mock from 'mockjs';
// 把JSON数据格式引入进来
import banner from './banner.json';
import floor from './floor.json';

// mock数据:Mock对象上的mock方法
// 第一个参数:请求的地址
// 第二个参数:请求的数据
Mock.mock('/mock/banner', { code: 200, data: banner });//模拟轮播图数据
Mock.mock('/mock/floor', { code: 200, data: floor });
