/**
 * 基于 src/router/routes/modules 文件结构动态生成路由
 */
export function getMenuModules() {
    const menuModules: any[] = [];
    const context = import.meta.webpackContext('./modules', {
        // 是否搜索子目录
        recursive: true,
        regExp: /\.tsx$/,
    });
    for (const path of context.keys()) {
        const mod: any = context(path);
        menuModules.push(mod.routes);
    }

    return menuModules;
}