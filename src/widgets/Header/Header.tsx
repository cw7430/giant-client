import HeaderTitle from './HeaderTitle';
import HeaderSearchBlock from './HeaderSearchBlock';
import HeaderAlarmButton from './HeaderAlarmButton';

export default function Header() {
  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/60">
      <div className="flex h-full items-center justify-between px-6">
        <HeaderTitle />
        <div className="flex items-center gap-4">
          <HeaderSearchBlock />
          <HeaderAlarmButton />
        </div>
      </div>
    </header>
  );
}
