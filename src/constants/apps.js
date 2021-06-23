/**
 * Config for the All Apps menu.
 */
import appDocumentationIcon from '../assets/images/learn.svg';
import appTaasIcon from '../assets/images/integrations.svg';
import appTaasAdminIcon from '../assets/images/taas-admin.png';
import myteamsIcon from '../assets/images/my-teams.svg';
import myteamsGreenIcon from '../assets/images/my-teams-green.svg';
import createTeamIcon from '../assets/images/create-team.svg';
import createTeamGreenIcon from '../assets/images/create-team-green.svg';
import earnIcon from "../assets/images/earn.svg";

/**
 * Micro-app categories
 */
export const APP_CATEGORIES = [
  {
    category: 'Manage',
    apps: [
      {
        title: 'TaaS',
        icon: appTaasIcon,
        path: '/taas/myteams',
        menu: [
          {
            title: 'My Teams',
            path: '/taas/myteams',
            icon: myteamsIcon,
            activeIcon: myteamsGreenIcon,
            isExact: true,
          },
          {
            title: 'Create New Team',
            path: '/taas/myteams/createnewteam',
            icon: createTeamIcon,
            activeIcon: createTeamGreenIcon,
            isExact: false,
          },
        ],
      },
      {
        title: 'TaaS Admin',
        icon: appTaasAdminIcon,
        path: '/taas-admin',
        menu: [],
        roles: ["bookingmanager","administrator"],
      },
      {
        title: 'Documentation',
        icon: appDocumentationIcon,
        path: "/model",
        menu: [],
      },
      {
        title: "Community Admin",
        icon: myteamsIcon,
        path: "/community-admin",
        menu: [],
        roles: ["Community Admin"],
      },
      {
        title: "Earn",
        icon: earnIcon,
        path: "/earn",
        menu: [],
      },
    ],
  },
];
