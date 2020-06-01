import React from "react";
import {
    Card,
    Carousel,
    CarouselItem,
    // CarouselControl,
    // CarouselIndicators,
    CarouselCaption,
} from "reactstrap";
    // import image1 from "../../assets/img/syros/1.jpg";
    // import image2 from "../../assets/img/syros/2.jpg";
    // import image3 from "../../assets/img/syros/3.jpg";

    import "../../assets/css/carousel.css";

const items = [
    {
      src: "https://greece-moments.com/wp-content/uploads/2019/03/syros-ermoupolis-vaporia-beach-agios-nikolaos.jpg",
      altText: '',
      caption: ''
    },
    {
      src: "https://www.discovergreece.com/sites/default/files/styles/sc_1920x1000/public/2019-12/to_meander_through_the_cobblestone_streets_of_upper_syros_as_the_name_translates_is_to_uncover_the_medieval_and_catholic_character-1.jpg?itok=JNKJkqph",
      altText: '',
      caption: ''
    },
    {
      src: "https://www.discovergreece.com/sites/default/files/styles/hd/public/2019-12/4_view_of_syros_town_hall-1.jpg?itok=prM3O5q-",
      altText: '',
      caption: ''
    }
];

class SlideShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = { activeIndex: 0 };
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    }
    
    onExiting() {
        this.animating = true;
      }
    
      onExited() {
        this.animating = false;
      }
    
      next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
      }
    
      previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
      }
    
      goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
      }
    
      render() {
        const { activeIndex } = this.state;
        const slides = items.map((item) => {
          return (
            <CarouselItem
            //   className="carouselImg"
              onExiting={this.onExiting}
              onExited={this.onExited}
              key={item.src}
            >
              <img src={item.src} alt={item.altText} />
              <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
            </CarouselItem>
          );
        });
    
        return (
          // <div>
        <Card className="card-chart" style={{borderRadius: "0px"}}>
          <Carousel
            activeIndex={activeIndex}
            next={this.next}
            previous={this.previous}
          >
            {/* <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} /> */}
            {slides}
            {/* <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} /> */}
            {/* <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} /> */}
          </Carousel>
        </Card>
        // </div>
        );
      }
    }

export default SlideShow;