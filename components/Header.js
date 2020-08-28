export default () => `
<header class="fixed-header">
    <a href="/"><img class="logo" src="https://github.com/JohanBester/JBBesterCapstoneProject/blob/master/IMAGES/FMAlogo.jpg?raw=true" /></a>

    <div class="appname">
        <a href="/">
            <span class="appname1">STIX </span>
            <span class="appname2">FMA Fun Finder</span>
        </a>
    </div>
    <nav>
        <i class="fas fa-bars"></i>
        <ul class="hidden nav-links">
            <li><a href="/" data-navigo>Home</a></li>
            <li><a href="Fmaresults" data-navigo>Search</a></li>
            <li><a href="Addinfo" data-navigo>Add Info</a></li>
            <li><a href="About" data-navigo>About</a></li>
            <li><a href="Contact" data-navigo>Contact</a></li>
            <li><a href="Login" data-navigo>Login</a></li>
            <li><a href="Disclaimers" data-navigo>Disclaimers</a></li>
        </ul>
    </nav>
</header>
`;
