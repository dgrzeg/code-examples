import { FC, PropsWithChildren } from 'react';
import Link from '../Link/Link';
import styles from './Block.module.css';

type BlockProps = PropsWithChildren<{
  title: string
  seeMoreLabel?: string
  seeMoreUrl?: string
  seeMoreDesktop?: boolean
}>;

const Block: FC<BlockProps> = ({
  title,
  seeMoreUrl,
  seeMoreLabel = 'Zobacz wszystkie',
  seeMoreDesktop = false,
  children,
}) => (
  <section className="section">
    <header className="section__header">
      <h2 className="section__title">{title}</h2>
      {seeMoreUrl && (
        <Link href={seeMoreUrl} className="section__more">
          {seeMoreLabel}
        </Link>
      )}
    </header>
    {children}
    {seeMoreUrl && (
      <footer className="section__footer">
        <Link
          href={seeMoreUrl}
          className={`btn btn-outline-primary section__more--mobile${
            seeMoreDesktop
              ? ` ${styles.sectionMoreDesktop}`
              : ''
          }`}
        >
          {seeMoreLabel}
        </Link>
      </footer>
    )}
  </section>
);

export default Block;
