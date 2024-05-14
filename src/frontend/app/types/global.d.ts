// declaration.d.ts
// declare module '*.scss' {
//   const content: Record<string, string>
//   export default content
// }
declare module '*.scss' {
    interface IClassNames {
        [className: string]: string
    }
    const classNames: IClassNames
    export = classNames
}

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'

declare module '*.svg' {
    import React from 'react'

    const content: React.VFC<React.SVGProps<SVGSVGElement>>
    export default content
}

declare const __IS_DEV__: boolean
declare const __API__: string
declare const __API_JSON__: string
declare const __PROJECT__: 'frontend' | 'storybook' | 'tests'

type DeepPartial<T> = T extends object
    ? {
          [P in keyof T]?: DeepPartial<T[P]>
      }
    : T

type OptionalRecord<K extends keyof any, T> = {
    [P in K]?: T
}

type ArrayType<T extends unknown[]> = T extends (infer U)[] ? U : never
