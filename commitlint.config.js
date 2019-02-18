/**
 * 下面是git规范代表的意思
 * fix: 修复bug
 * feat: 增加功能
 * doc: 仅仅修改了文档，例如：README, CHANGELOG等
 * style: 仅仅修改了空格，格式缩进，不改变代码的逻辑结构
 * refactor: 代码重构，没有添加新功能或者修复bug
 * revert: 回滚
 * build: 构建和发布代码
 * ci: 持续集成
 * test: 测试
 * perf: 优化相关，比如性能和体验，比如，用户提示文案的修正等等
 */

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['fix', 'feat', 'docs', 'style', 'refactor', 'chore', 'build', 'ci', 'test', 'revert', 'perf']
    ],
    'header-max-length': [2, 'always', 72],
    'subject-case': [0, 'never'],
    'subject-full-stop': [0, 'never']
  }
}
