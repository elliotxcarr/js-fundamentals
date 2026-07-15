# AI Agents

## Devops Agent
- Summarises work item
- creates branches following naming convension 
- creates commits with messages in naming convension
- updates work item status in devops
- adds branch/prs to work item
- builds pull requests based on changes and refers to work item description
- if resolving merge conflicts, it finds the work item for the conflicting commit and evaluates if functionality is lost


## ReAct Pattern
The AI agent works in a loop:
→ receive context
→ reason
→ use a tool
→ observe the result
→ reason again
→ produce output