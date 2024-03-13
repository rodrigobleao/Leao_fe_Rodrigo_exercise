import * as React from 'react';
import {ListItem, Teams as TeamsList} from 'types';
import SearchInput from 'components/SearchInput';
import {getTeams as fetchTeams} from '../api';
import Header from '../components/Header';
import List from '../components/List';
import {Container} from '../components/GlobalComponents';

const mapTeams = (teams: TeamsList[]): ListItem[] => {
    return teams.map(team => {
        return {
            id: team.id,
            url: `/team/${team.id}`,
            columns: [
                {
                    key: 'Name',
                    value: team.name,
                },
            ],
            navigationProps: team,
        };
    });
};

const Teams: React.FC = () => {
    const [teams, setTeams] = React.useState<TeamsList[]>([]);
    const [filteredTeams, setFilteredTeams] = React.useState<TeamsList[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        const getTeams = async () => {
            const response = await fetchTeams();
            setTeams(response);
            setFilteredTeams(response);
            setIsLoading(false);
        };
        getTeams();
    }, []);

    const handleSearch = (filter: string) => {
        const filtered = teams.filter(team =>
            team.name.toLowerCase().includes(filter.toLowerCase())
        );
        setFilteredTeams(filtered);
    };

    return (
        <Container>
            <Header title="Teams" showBackButton={false} />
            <SearchInput onSearch={handleSearch} />
            <List items={mapTeams(filteredTeams)} isLoading={isLoading} />
        </Container>
    );
};

export default Teams;
