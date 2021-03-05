import React from 'react';
import { connect } from 'react-redux';
import { Form, Dropdown, Input, Button, Modal } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import {
    getMovies, enterMovie, createUserFlick,
    getRandomMovie, resetMessage
} from '../../store/movies/actionCreators';
import { RootState } from '../../store/rootState';
import { CreateMovieModel, MovieMetaData, RandomMovieModel } from '../../store/movies/types';
import { Messenger } from './Messenger';
import './Movies.scss';

interface MoviesProps {
    genres: string[];
    selectedMovies: RandomMovieModel[];
    surfaceMessage: string;
    metaData: MovieMetaData | null;
    userId: number;
    getMovies: () => void;
    resetMessage: () => void;
    createUserFlick: (userId: number, movieId: number) => void;
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
    componentDidUpdate(prevProps: Readonly<MoviesProps>) {
        const { selectedMovies } = this.props;
        if (prevProps.selectedMovies !== selectedMovies) {
            selectedMovies.forEach((s: RandomMovieModel, index: number) => {
                return new Messenger(`messenger-${index}`, [s.title])
            })
        }
    }
    render() {
        const { genres, selectedMovies, surfaceMessage, userId, metaData } = this.props;
        const { title, genre, randomCount } = this.state;
        return (
            <div className="flex-column home-container">
                <Form className="submit-movie-form">
                    <div className="flex-row">
                        <Form.Field>
                            <Input className="add-movie-input" placeholder="Movie" value={title} onChange={(e: any) => this.setState({ title: e.target.value })} />
                        </Form.Field>
                        <Form.Field>
                            <Dropdown className="genre-dropdown" trigger={genre} placeholder="Genre">
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
                    <Button disabled={title.trim() === '' || genre === ''} type="submit" basic onClick={() => { this.props.enterMovie({ title: title, genre: genre }); this.setState({ title: '', genre: '' }) }}>Submit Movie</Button>
                </Form>
                <div className="flex-row random-movie">
                    <Button onClick={() => this.props.getRandomMovie(randomCount)} type="button" basic>Get Random {randomCount === 1 ? 'Movie' : 'Movies'}</Button>
                    <Dropdown trigger={randomCount} placeholder="Select Count">
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => this.setState({ randomCount: 1 })}>1</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setState({ randomCount: 3 })}>3</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setState({ randomCount: 5 })}>5</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <Modal closeOnDimmerClick={true} onClose={this.props.resetMessage} open={surfaceMessage !== null}>
                    {surfaceMessage}
                    <Button onClick={this.props.resetMessage}>No</Button>
                    <Button onClick={() => this.props.createUserFlick(userId, metaData ? metaData.movieId : -1)}>Yes</Button>
                </Modal>
                {
                    selectedMovies.length > 0 &&
                    <div className="flex-column messenger-container">
                        {
                            selectedMovies.map((s: RandomMovieModel, index: number) => {
                                return (
                                    <div className="messenger" id={`messenger-${index}`}></div>
                                )
                            })
                        }
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        genres: state.MoviesState.genres,
        selectedMovies: state.MoviesState.selectedMovies,
        surfaceMessage: state.MoviesState.surfaceMessage,
        metaData: state.MoviesState.metaData,
        userId: state.AuthState.user.id
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return bindActionCreators({
        getMovies, enterMovie, getRandomMovie, resetMessage, createUserFlick
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies);