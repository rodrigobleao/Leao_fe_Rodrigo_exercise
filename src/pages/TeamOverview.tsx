import * as React from 'react';
import {useLocation, useParams} from 'react-router-dom';
import {ListItem, UserData} from 'types';
import SearchInput from 'components/SearchInput';
import {getTeamOverview, getUserData} from '../api';
import Card from '../components/Card';
import {Container} from '../components/GlobalComponents';
import Header from '../components/Header';
import List from '../components/List';

const mapArray = (users: UserData[]): ListItem[] => {
    return users.map(u => {
        const columns = [
            {
                key: 'Name',
                value: `${u.firstName} ${u.lastName}`,
            },
            {
                key: 'Display Name',
                value: u.displayName,
            },
            {
                key: 'Location',
                value: u.location,
            },
        ];
        return {
            id: u.id,
            url: `/user/${u.id}`,
            columns,
            navigationProps: u,
        };
    });
};

const mapTeamLead = (teamLead: UserData): React.ReactNode => {
    const columns = [
        {
            key: 'Team Lead',
            value: '',
        },
        {
            key: 'Name',
            value: `${teamLead.firstName} ${teamLead.lastName}`,
        },
        {
            key: 'Display Name',
            value: teamLead.displayName,
        },
        {
            key: 'Location',
            value: teamLead.location,
        },
    ];
    return <Card columns={columns} url={`/user/${teamLead.id}`} navigationProps={teamLead} />;
};

interface PageState {
    teamLead?: UserData;
    teamMembers?: UserData[];
}

const TeamOverview: React.FC = () => {
    const location = useLocation();
    const {teamId} = useParams<{teamId: string}>();
    const [pageData, setPageData] = React.useState<PageState>({});
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [filteredMembers, setFilteredMembers] = React.useState<UserData[]>([]);

    React.useEffect(() => {
        const getTeamUsers = async () => {
            const {teamLeadId, teamMemberIds = []} = await getTeamOverview(teamId);
            const teamLead = await getUserData(teamLeadId);

            const teamMembersData = await Promise.all(teamMemberIds.map(id => getUserData(id)));
            const teamMembers = teamMembersData.filter(member => member);

            setPageData({
                teamLead,
                teamMembers,
            });
            setIsLoading(false);
            setFilteredMembers(teamMembers);
        };
        getTeamUsers();
    }, [teamId]);

    const handleSearch = (searchTerm: string) => {
        const filtered = pageData.teamMembers?.filter(member =>
            `${member.firstName} ${member.lastName}`
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
        setFilteredMembers(filtered || []);
    };

    return (
        <Container>
            <Header title={`Team ${location.state?.name}`} />
            <SearchInput onSearch={handleSearch} />
            {!isLoading && pageData.teamLead && mapTeamLead(pageData.teamLead)}
            <List items={mapArray(filteredMembers)} isLoading={isLoading} />
        </Container>
    );
};

export default TeamOverview;
