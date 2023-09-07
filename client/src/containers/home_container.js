import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBooks } from '../actions';
import { bindActionCreators } from 'redux';
import BookItems from '../widgetsUI/book_items';


class HomeContainer extends Component {

    componentDidMount() {
        this.props.getBooks(1,0,'desc');
    }

    renderBooks = (books) => (
        books.list ? 
            books.list.map((item) => (
                <BookItems {...item}  key={item._id} />
            )) 
        :
        null
    )

    loadMore = () => {
            let count = this.props.books.list.length;
            this.props.getBooks(1,count,'desc',this.props.books.list);
    }

    render() {

        return (
            <div>
                {this.renderBooks(this.props.books)}
                <div className='loadmore' onClick={this.loadMore}> Load More</div>
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        books: state.books
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({getBooks},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(HomeContainer);