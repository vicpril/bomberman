import { PluginItem } from '@babel/core'

export default function babelRemovePropsPlugin(): PluginItem {
    return {
        visitor: {
            Program(path, state) {
                const atteibutesToClean = state.opts.props || []

                path.traverse({
                    JSXIdentifier(currentPath) {
                        const currentAttributeName = currentPath.node.name

                        if (atteibutesToClean.includes(currentAttributeName)) {
                            currentPath.parentPath.remove()
                        }
                    },
                })
            },
        },
    }
}
