import LogoSmall from "@assets/images/logo-small.svg";
import StatDisplay from "@/ui/StatDisplay";
import { useTypingContext } from "@/contexts/useTypingContext";

const Header = () => {
  const { personalBest } = useTypingContext();
  return (
    <div className="header">
      <div className="header-left">
        <img src={LogoSmall} alt="typing-test-logo" />
        <div className="header-title-content">
          <h1 className="header-title">Typing Speed Test</h1>
          <p className="header-description">
            Type as fast as you can in 60 seconds
          </p>
        </div>
      </div>
      <div className="header-right">
        <StatDisplay
          name="Best"
          value={`${personalBest} WPM`}
          type="best-score"
        />
      </div>
    </div>
  );
};

export default Header;
