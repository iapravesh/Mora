# Security Policy for Mora Bot

## Supported Versions
- Only the latest stable release of Mora Bot is supported.
- Older versions may have vulnerabilities and are not supported.

---

## Reporting a Vulnerability
If you discover a security issue in Mora Bot, please **report it privately** to the maintainer.  

- **Email:** [themora044@gmail.com](mailto:themora044@gmail.com)  
- **Subject Line:** Security Issue: [Brief description]

Do **not** open an issue in the public repository for security vulnerabilities.

---

## Supported Security Guidelines

1. **Environment Variables**  
   - Never hardcode sensitive data like `TOKEN`, `GUILD_ID`, or API keys in the code.  
   - Always use a `.env` file and `.gitignore` it.

2. **Permissions**  
   - Only assign necessary permissions to the bot in Discord (use principle of least privilege).  
   - Avoid giving `ADMINISTRATOR` unless required.

3. **Dependencies**  
   - Keep dependencies updated regularly (`npm outdated` → update).  
   - Only use trusted npm packages.

4. **User Input Validation**  
   - All command inputs (tournament names, user mentions, IDs) are validated to prevent abuse.  
   - Duplicate teams or users are blocked in tournaments.

5. **No Sensitive Logs**  
   - Do not log bot tokens, private messages, or personal user info.  

---

## Supported Environment
- Node.js >= 18.x  
- Discord Server with roles properly configured  
- `.env` file for secrets  

---

## Security Updates
- Security patches will be communicated via **GitHub Releases**.  
- Users are encouraged to update the bot to the latest release to stay secure.

---

## Disclaimer
- The maintainer is not responsible for misuse of the bot.  
- Always follow Discord's Terms of Service to avoid server bans.
