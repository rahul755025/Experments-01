const tasks = [
  { title: 'Deep work sprint', owner: 'Ava', group: 'Product Launch', status: 'In progress', recurrence: 'Weekdays', due: '09:00', score: 90, steps: ['Outline brief', 'Draft prototype', 'Review blockers'], audit: 3, comments: 8, files: 3 },
  { title: 'Client report', owner: 'Mina', group: 'Public Ops Circle', status: 'Review', recurrence: 'Monthly', due: '13:30', score: 68, steps: ['Collect metrics', 'Write summary', 'Export PDF'], audit: 2, comments: 5, files: 2 },
  { title: 'Workout + recovery', owner: 'You', group: 'Personal', status: 'Planned', recurrence: 'Daily', due: '18:00', score: 82, steps: ['Warmup', 'Strength set', 'Stretch'], audit: 2, comments: 2, files: 0 },
  { title: 'Team learning session', owner: 'Noah', group: 'Learning Team', status: 'Backlog', recurrence: 'Weekly', due: '16:00', score: 54, steps: ['Pick topic', 'Assign speaker', 'Share notes'], audit: 1, comments: 11, files: 5 }
];

const icons = { calendar: '📅', award: '🏆', steps: '👣', users: '👥', chart: '📊', share: '🔗', spark: '✨', file: '📎', msg: '💬', clock: '🕒', check: '✅' };
const weeklyFocus = [62, 76, 88, 71, 93, 58, 80];
const monthlyCompletion = [70, 82, 64, 91];
let activeView = 'Kanban';

function bars(values) {
  const max = Math.max(...values);
  return `<div class="bars">${values.map(value => `<span style="height:${(value / max) * 100}%"><b>${value}%</b></span>`).join('')}</div>`;
}

function taskCard(task) {
  const statusClass = task.status.toLowerCase().replaceAll(' ', '-');
  return `<article class="task-card">
    <div class="task-top"><span class="pill ${statusClass}">${task.status}</span><span>${task.due}</span></div>
    <h3>${task.title}</h3><p>${task.group} • Owner: ${task.owner} • ${task.recurrence}</p>
    <div class="progress"><span style="width:${task.score}%"></span></div>
    <ul>${task.steps.map(step => `<li>${icons.check}${step}</li>`).join('')}</ul>
    <div class="meta"><span>${icons.msg}${task.comments}</span><span>${icons.file}${task.files}</span><span>${icons.clock}Audit ${task.audit}</span></div>
  </article>`;
}

function render() {
  const suggestion = 'Move high-focus work before 11:00, batch comments after lunch, and reserve 18:00 for fitness recovery to protect your streak.';
  document.querySelector('#root').innerHTML = `<main>
    <section class="hero">
      <nav><strong>RhythmOS</strong><span>Daily schedule • collaboration • fitness</span></nav>
      <div class="hero-grid">
        <div><p class="eyebrow">All-in-one schedule command center</p><h1>Plan, audit, analyze, and improve every day.</h1><p>Manage personal routines and public team groups with task graduation, recurring deadlines, reports, rewards, and health signals in one adaptive workspace.</p><div class="actions"><button>＋ Create task</button><button class="ghost">⬇ Export report</button></div></div>
        <section class="prompt-card"><p class="eyebrow">Improved generation prompt</p><h2>AI app brief optimized for minimum-token execution</h2><p>Build a responsive daily schedule tracking SaaS prototype with auditable tasks, calendar planning, weekly/monthly analytics, AI schedule suggestions, gamified rewards, smart periodization, collaboration, downloadable reports, groups, subtasks/checklists, recurring due dates, Kanban/timeline/calendar views, and fitness tracking for steps, calories, workouts, and recovery.</p></section>
      </div>
    </section>
    <section class="stats"><div>${icons.calendar}<b>24</b><span>scheduled tasks</span></div><div>${icons.award}<b>4</b><span>badges unlocked</span></div><div>${icons.steps}<b>8,420</b><span>steps today</span></div><div>${icons.users}<b>6</b><span>active groups</span></div></section>
    <section class="workspace"><aside><h2>Flexible views</h2>${['Kanban', 'Timeline / Gantt', 'Calendar'].map(item => `<button class="view-button ${activeView === item ? 'active' : ''}" data-view="${item}">▦ ${item}</button>`).join('')}<div class="suggestion">${icons.spark}<h3>Smart periodization</h3><p>${suggestion}</p></div></aside><div class="board"><div class="board-head"><h2>${activeView} board</h2><span>Drag tasks, assign teammates, attach files, and track every audit event.</span></div><div class="tasks">${tasks.map(taskCard).join('')}</div></div></section>
    <section class="insights"><div class="panel"><h2>${icons.chart} Weekly task analysis</h2>${bars(weeklyFocus)}<p>Graph trends show strongest completion on focus-heavy weekdays and lower output during weekend context switching.</p></div><div class="panel"><h2>${icons.chart} Monthly completion</h2>${bars(monthlyCompletion)}<p>Downloadable monthly reports combine task history, audit trails, comments, files, and group performance.</p></div><div class="panel fitness"><h2>${icons.steps} Fitness tracker</h2><div class="rings"><span>8.4k steps</span><span>620 cal</span><span>45m active</span></div><p>Track daily footsteps, calories, workouts, hydration, sleep notes, and recovery reminders beside your schedule.</p></div></section>
    <section class="collab"><h2>${icons.share} Collaboration and groups</h2><div class="chips">${['Personal groups', 'Public groups', 'Task assignment', 'Comments', 'File sharing', 'Checklist subtasks', 'Recurring due dates', 'Downloadable reports'].map(chip => `<span>${chip}</span>`).join('')}</div></section>
  </main>`;
  document.querySelectorAll('.view-button').forEach(button => button.addEventListener('click', () => { activeView = button.dataset.view; render(); }));
}

render();
