import React from 'react';
import { connect } from 'react-redux';
import { Form, Dropdown, Input, Button } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { getMovies, enterMovie, getRandomMovie } from '../../store/movies/actionCreators';
import { RootState } from '../../store/rootState';
import { CreateMovieModel, RandomMovieModel } from '../../store/movies/types';

interface MoviesProps {
    genres: string[];
    selectedMovies: RandomMovieModel[];
    getMovies: () => void;
    getRandomMovie: (num: number) => void;
    enterMovie: (data: CreateMovieModel) => void;
}

interface MoviesState {
    title: string,
    genre: string,
    randomCount: number
}

class Movies extends React.Component<MoviesProps, MoviesState> {
    constructor(props: any) {
        super(props);
        this.state = {
            title: '',
            genre: '',
            randomCount: 1
        }
    }
    componentDidMount() {
        this.props.getMovies();
    }
    render() {
        const { genres, selectedMovies } = this.props;
        const { title, genre, randomCount } = this.state;
        return (
            <div>
                <Form>
                    <div className="flex-row">
                        <Form.Field>
                            <Input value={title} onChange={(e: any) => this.setState({ title: e.target.value })} />
                        </Form.Field>
                        <Form.Field>
                            <Dropdown trigger={genre} placeholder="Select Genre">
                                <Dropdown.Menu>
                                    {
                                        genres.map((g: string) => {
                                            return (
                                                <Dropdown.Item onClick={() => { this.setState({ genre: g }) }} key={g}>{g}</Dropdown.Item>
                                            )
                                        })
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </Form.Field>
                    </div>
                    <Button type="submit" basic onClick={() => this.props.enterMovie({ title: title, genre: genre })}>Submit Movie</Button>
                </Form>
                <div className="flex-row">
                    <Button onClick={() => this.props.getRandomMovie(randomCount)} type="button" basic>Get Random Movie</Button>
                    <Dropdown trigger={randomCount} placeholder="Select Count">
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => this.setState({ randomCount: 1 })}>1</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setState({ randomCount: 3 })}>3</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setState({ randomCount: 5 })}>5</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div>
                    {
                        selectedMovies.map((s: RandomMovieModel) => {
                            return (
                                <div key={s.title}>
                                    {s.title}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        genres: state.MoviesState.genres,
        selectedMovies: state.MoviesState.selectedMovies
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        getMovies, enterMovie, getRandomMovie
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies);