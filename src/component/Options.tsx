import { Page } from "../model/page"

type OptionsProps = {
    pages: Page[]
} & React.ComponentProps<'div'>

export const Options = ({className, pages, ...props}: OptionsProps) => {
    return (
        <div className={`${className}`} {...props}>
            <h2>Choices</h2>
            {pages.map(page => (
                <a href={page.href}>{page.title}</a>
            ))}
        </div>
    )
}